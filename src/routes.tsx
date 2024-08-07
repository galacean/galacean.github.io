import { Navigate, createBrowserRouter } from 'react-router-dom';
import Api from './components/Api';
import Doc from './components/doc';
import ErrorPage from './components/ErrorPage';
import Example from './components/Example';
import Examples from './components/Examples';
import Footer from './components/footer';
import GLTFView from './components/GltfViewer/gltf-viewer';
import Header from './components/header';

export const router = createBrowserRouter([
  {
    path: '/docs/:ver/:lang/:docTitle',
    element: (
      <>
        <Header></Header>
        <Doc></Doc>
      </>
    ),
  },
  {
    path: '/docs/:ver/:lang',
    element: (
      <>
        <Header></Header>
        <Doc></Doc>
      </>
    ),
  },
  {
    path: '/example/:exampleId',
    element: (
      <>
        <Example />
      </>
    ),
  },
  {
    path: '/examples/:version/:exampleTitle',
    element: (
      <>
        <Examples />
      </>
    ),
  },
  {
    path: '/examples/:version',
    element: (
      <>
        <Examples />
      </>
    ),
  },
  {
    path: '/api/:ver/:pkg/:name',
    element: (
      <>
        <Header></Header>
        <Api></Api>
      </>
    ),
    errorElement: (
      <>
        <Header></Header>
        <ErrorPage />
        <Footer></Footer>
      </>
    ),
  },
  {
    path: '/api/:ver/:pkg',
    element: (
      <>
        <Header></Header>
        <Api></Api>
      </>
    ),
  },
  {
    path: '/api/:ver',
    element: (
      <>
        <Header></Header>
        <Api></Api>
      </>
    ),
  },
  {
    path: '/api',
    element: (
      <>
        <Header></Header>
        <Api></Api>
      </>
    ),
  },
  {
    path: '/gltf-viewer',
    element: (
      <>
        <Header></Header>
        <GLTFView></GLTFView>
      </>
    ),
  },
  {
    path: '/',
    element: <Navigate to="/docs/latest/:lang/getting-started-overview" />,
    errorElement: (
      <>
        <Header></Header>
        <ErrorPage />
        <Footer></Footer>
      </>
    ),
  },
], {
  basename: '/archive-engine'
});
