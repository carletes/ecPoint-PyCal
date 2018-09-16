FROM debian:stretch-slim AS build

# Install build tools.

RUN set -ex \
    && apt-get update \
    && apt-get install --yes --no-install-suggests --no-install-recommends \
       ca-certificates \
       cmake \
       g++ \
       gcc \
       git \
       libc6-dev \
       make \
       python-dev \
       python-pip \
       xz-utils \
       wget

RUN set -ex \
    && pip install --upgrade \
       pip \
       setuptools

# Install ecbuild (for eccodes).

RUN set -ex \
    && mkdir -p /src \
    && cd /src \
    && git clone https://github.com/ecmwf/ecbuild \
    && cd ecbuild \
    && git checkout 2018.02.0

RUN set -ex \
    && mkdir -p /build/ecbuild \
    && cd /build/ecbuild \
    && cmake /src/ecbuild \
    && make \
    && make install

# Install ecpoint-cal (Python components).
#
# Do it before installing eccodes, so that we get Numpy (both
# ecpoint-cal and eccodes depend on Numpy).

COPY README.md /src/ecpoint-cal/README.md
COPY core/ /src/ecpoint-cal/core/
COPY setup.py /src/ecpoint-cal/setup.py

RUN set -ex \
    && cd /src/ecpoint-cal \
    && ls -l \
    && python setup.py install

# Install eccodes.

RUN set -ex \
    && mkdir -p /src \
    && cd /src \
    && wget -q -O - https://confluence.ecmwf.int/download/attachments/45757960/eccodes-2.7.3-Source.tar.gz | \
       tar xzf -

RUN set -ex \
    && mkdir -p /build/eccodes \
    && cd /build/eccodes \
    && ecbuild /src/eccodes-2.7.3-Source \
       -DENABLE_FORTRAN=OFF \
       -DENABLE_PYTHON=ON \
    && make -j $(nproc) \
    && make install

# Install Node.js.

RUN set -ex \
    && wget -q -O - http://nodejs.org/dist/v8.11.2/node-v8.11.2-linux-x64.tar.xz | \
    tar xJf - -C /usr/local --strip-components=1 --no-same-owner

# Install ecpoint-cal (Javascript components).

COPY .babelrc /src/ecpoint-cal/.babelrc
COPY index.html /src/ecpoint-cal/index.html
COPY package-lock.json /src/ecpoint-cal/package-lock.json
COPY package.json /src/ecpoint-cal/package.json
COPY server.js /src/ecpoint-cal/server.js
COPY ui/ /src/ecpoint-cal/ui/
COPY webpack.config.js /src/ecpoint-cal/webpack.config.js

RUN set -ex \
    && cd /src/ecpoint-cal \
    && npm install \
    && npm run build

# Run-time image.

FROM debian:stretch-slim

RUN set -ex \
    && apt-get update \
    && apt-get install --yes --no-install-suggests --no-install-recommends \
       libasound2 \
       libgconf-2-4 \
       libgtk-3-0 \
       libnss3 \
       libx11-6 \
       libxau6 \
       libxcb1 \
       libxdmcp6 \
       libxext6 \
       libxss1 \
       libxtst6 \
       libxtst6 \
       python \
       python-tk

COPY --from=build /src/ecpoint-cal /src/ecpoint-cal/
COPY --from=build /usr/local/bin/ /usr/local/bin/
COPY --from=build /usr/local/lib/ /usr/local/lib/
COPY --from=build /usr/local/share/eccodes/ /usr/local/share/eccodes/

WORKDIR /src/ecpoint-cal

CMD ["./node_modules/.bin/electron", "server.js"]
