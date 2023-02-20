# @2ppl/core

This is core project that contains base functions to create server and client side applications with some interfaces.

## 🌀 Structure

- api
- core
- crud
- di
- examples

### 🔷 core

Contains utility functions

### 🔷 api

The main part of this module is `AxiosService`. It helps to create http queries and validate incoming data.

You can add `BeforeRequestHandler` in instance of this service which mutates config of each single http request.

`(config: AxiosRequestConfig) => AxiosRequestConfig`

To create `EntityAxiosService` with your business logic requests you must extend `AxiosService` and add query methods, for example:

```typescript
async superCreate(data: DataType): Promise<ResponseType> {
  return this.request({
    method: 'POST',
    url: '/api/entity/super-create',
    data,
  }, TypeCompiler.Compile(typeboxJsonSchema));
}
```

### 🔷 crud

Contains `CrudService` with base methods:
- create
- update
- remove
- findOne
- findAll

Also, there is `CrudAxiosService` that implements `CrudService` and extends `AxiosService`.
Is realises CRUD interface with axios requests and Typebox validators.

### 🔷 di

Simple Dependency Injection tool that register object-creators with their interfaces in runtime.

```typescript
interface TestType {
  test: boolean;
}

registerDependency('TEST_KEY', () => ({ test: true }));

const object: TestType = getDependency<TestType>('TEST_KEY');
```

It has two strategies:
- singleton - creator used on first getDependency call and after returns cached value
- factory - creator used every getDependency call

## 🌀 Dependencies

- `nodejs ^19`
- `yarn ^1.22`

## 🌀 Install

```shell
yarn install
```

## 🌀 Conventional Commits

https://www.conventionalcommits.org/en/v1.0.0/

### Project commit types

- `fix:` commit for `PATCH` bugs
- `feat:` commit for add `MINOR` features
- `BREAKING CHANGE:` commit for add `MAJOR` changes