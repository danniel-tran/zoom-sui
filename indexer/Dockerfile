# Use a recent Rust image that supports Cargo.lock v4
FROM rust:latest as builder

# Install PostgreSQL client libraries

RUN apt-get update && apt-get install -y build-essential libssl-dev libpq-dev pkg-config curl cmake clang ca-certificates git

RUN apt-get update && apt-get install -y \
    libpq-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*
    

# Create app directory
WORKDIR /app

# Copy manifests
COPY Cargo.toml Cargo.lock ./

COPY ./src ./src
COPY ./migrations ./migrations

# Build for release
RUN cargo build --release
# RUN cargo run --release -- --remote-store-url https://checkpoints.testnet.sui.io --first-checkpoint 263614008
# Runtime stage
FROM debian:bookworm-slim

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    libpq5 \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Copy the binary from builder
COPY --from=builder /app/target/release/suimeet-indexer /usr/local/bin/suimeet-indexer

# Set the startup command
ENTRYPOINT ["suimeet-indexer"]