import { createHashRouter } from 'react-router-dom';
import Api from './components/Api';
import Doc from './components/doc';
import Example from './components/Example';
import Examples from './components/Examples';
import Footer from './components/footer';
import GLTFView from './components/GltfViewer/gltf-viewer';
import Header from './components/header';
import Home from './components/home';
import LabelManager from './components/LabelManager';

export const router = createHashRouter([
  {
    path: '/label/:type',
    element: (
      <>
        <Header></Header>
        <LabelManager></LabelManager>
        <Footer></Footer>
      </>
    ),
  },
  {
    path: '/docs/:lang',
    element: (
      <>
        <Header></Header>
        <Doc></Doc>
        <Footer></Footer>
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
    path: '/example',
    element: (
      <>
        <Example />
      </>
    ),
  },
  {
    path: '/examples/:exampleTitle',
    element: (
      <>
        <Examples />
      </>
    ),
  },
  {
    path: '/examples',
    element: (
      <>
        <Examples />
      </>
    ),
  },
  {
    path: '/docs/:lang/:docTitle',
    element: (
      <>
        <Header></Header>
        <Doc></Doc>
        <Footer></Footer>
      </>
    ),
  },
  {
    path: '/api/:pkg/:item',
    element: (
      <>
        <Header></Header>
        <Api></Api>
        <Footer></Footer>
      </>
    ),
  },
  {
    path: '/api/:pkg/',
    element: (
      <>
        <Header></Header>
        <Api></Api>
        <Footer></Footer>
      </>
    ),
  },
  {
    path: '/api',
    element: (
      <>
        <Header></Header>
        <Api></Api>
        <Footer></Footer>
      </>
    ),
  },
  {
    path: '/gltf-viewer',
    element: (
      <>
        <Header></Header>
        <GLTFView></GLTFView>
        <Footer></Footer>
      </>
    ),
  },
  {
    path: '/',
    element: <Home></Home>,
  },
]);
