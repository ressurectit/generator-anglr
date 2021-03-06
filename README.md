[![npm version](https://badge.fury.io/js/generator-anglr.svg)](https://badge.fury.io/js/generator-anglr)
[![Build status](https://ci.appveyor.com/api/projects/status/sd4r028kcvm8qupv?svg=true)](https://ci.appveyor.com/project/kukjevov/generator-anglr)

# generator-anglr
> Yeoman generators for angular projects

## Installation

First, install [Yeoman](http://yeoman.io) and generator-anglr using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-anglr
```

Then generate your new project:

```bash
yo anglr
```

Then you can use subgenerators for scaffolding:

```bash
yo anglr:subgeneratorName
```

**Supported subgenerators**
 
 - `component` - Generates `Angular` component
 - `directive` - Generates `Angular` directive
 - `pipe` - Generates `Angular` pipe
 - `page` - Generates `Angular` page component with route and permissions
 - `module` - Generates `Angular` module with component, or directive or pipe
 - `lazyRouteModule` - Generates `Angular` lazy route module

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [kukjevov]()
