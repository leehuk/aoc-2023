FROM fedora:41

RUN dnf install -y nodejs-npm

RUN groupadd -g 1000 aoc
RUN useradd -u 1000 -g 1000 -d /mnt aoc

USER aoc
WORKDIR /mnt
