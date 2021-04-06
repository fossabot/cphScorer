FROM postgres:13.0-alpine
ARG UNAME
ARG UID
ARG GID
RUN addgroup --gid $GID -S $UNAME
RUN adduser --uid $UID -S $UNAME -G $UNAME
USER $UNAME