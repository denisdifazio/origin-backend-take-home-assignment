# Origin Backend Take-Home Assignment

## Table of Contents

- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Development](#development)
  - [Technology Stack](#technology-stack)
  - [Architecture](#architecture)
  - [Technical Decisions](#technical-decisions)
  - [Linting and Formatting](#linting-and-formatting)
    - [Commits](#commits)
  - [Testing](#testing)

## Requirements

If just running the service locally:

- Docker

For further local development:

- Docker
- Node 16
- npm 8

## Getting Started

Live demo at: https://origin-backend-assignment.herokuapp.com/docs

The service can be initialized with the command:

```
docker compose up --build --force-recreate
```

After completion, the service will be running on localhost:3000 by default or on `PORT` environment variable.

At `/docs` there is a live OpenAPI (Swagger) page with all the endpoints supplied by the Rest API.

## Development

### Technology Stack

The following technologies were used in the creation of the service:

- Language: Typescript
- Server Framework: Fastify
- Test Framework: Jest
- Infrastructure: Docker

### Architecture

This repository is organized following an [onion architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) where each directory corresponds to a specific design layer. From outer to inner layer:

- Infrastructure layer: /routes
- Adapters layer: /controllers
- Application layer: /services
- Domain layer: /models

Each inner layer should not have dependencies on outer layers. The connection between layers is done using Dependency Injection which is executed manually here, but as the repository grows it would be possible to use a DI Container library to automatically inject dependencies between modules.

#### Extendability

The score engine is designed for extensibility by providing a simple way to add new rules without the need of editing other parts of the code beyond the entrypoint (app.ts) and the new rule itself.

#### Thoughts on new features

- What changes would be necessary to include a new endpoint to run a specific rule?

With a new endpoint as `POST /risk-profiles/rules/:id`, RiskProfileRule interface would need to be refactored to a object with at least two fields:

```ts
export interface RiskProfileRule {
  id: string; // rule identification
  execute: (personalInformation: PersonalInformation, riskProfile: RiskProfile) => void;
}
```

- What changes would be necessary to include/exclude a new rule dynamically on runtime?

With new endpoint as `POST /risk-profiles/rules` or `DELETE /risk-profiles/rules/:id`, RiskProfileRule interface would need the same refactor as seen above. Furthermore, riskProfileService would need to store the array of rules as a shareable state.

### Technical Decisions

It is not explicitly said in the assignment's "risk algorithm" how to use the *base score* calculated from the risk questions. In this code it was used as initial value for all insurances. Furthermore, rules with words "over"/"above" and "under" were mathematically translated to ">" and "<" respectively.
### Linting and Formatting

To ensure that all outputted code conforms to a consistent style, this repository uses Prettier as code formatter and ESLint to detect syntax errors.

#### Commits

Also, this repository follows [Conventional Commits](https://www.conventionalcommits.org) specification. Every commit should follow the template below:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Testing

Unit Testing is built using [Jest](https://jestjs.io/) as test framework. To run all tests, execute `npm test` command.