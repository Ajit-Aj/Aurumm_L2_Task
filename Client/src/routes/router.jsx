// import { createBrowserRouter } from 'react-router-dom';
// import AppLayout from '../layout/AppLayout';
// import Login from '../pages/Login';
// import Products from '../pages/Products';
// import AddProduct from '../pages/AddProduct';
// import EditProduct from '../pages/EditProduct';
// import PrivateRoute from './PrivateRoutes';
// import Register from '../pages/Register';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <AppLayout />,
//     children: [
//       { path: 'login', element: <Login /> },
//       { path: 'register', element: <Register /> },
//       {
//         path: '/',
//         element: <PrivateRoute />,
//         children: [
//           { index: true, element: <Products /> },
//           { path: 'add', element: <AddProduct /> },
//           { path: 'edit/:id', element: <EditProduct /> },
//         ],
//       },
//     ],
//   },
// ]);

// export default router;















// import { createBrowserRouter } from 'react-router-dom';
// import AppLayout from '../layout/AppLayout';
// import Login from '../pages/Login';
// import Products from '../pages/Products';
// import AddProduct from '../pages/AddProduct';
// import EditProduct from '../pages/EditProduct';
// import PrivateRoute from './PrivateRoutes';
// import Register from '../pages/Register';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <AppLayout />,
//     children: [
//       // Public routes
//       { path: 'login', element: <Login /> },
//       { path: 'register', element: <Register /> },

//       // Protected routes (use PrivateRoute inline)
//       {
//         index: true,
//         element: (
//           <PrivateRoute>
//             <Products />
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: 'add',
//         element: (
//           <PrivateRoute>
//             <AddProduct />
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: 'edit/:id',
//         element: (
//           <PrivateRoute>
//             <EditProduct />
//           </PrivateRoute>
//         ),
//       },
//     ],
//   },
// ]);

// export default router;












import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import Login from '../pages/Login';
import Products from '../pages/Products';
import AddProduct from '../pages/AddProduct';
import EditProduct from '../pages/EditProduct';
import PrivateRoute from './PrivateRoutes';
import Register from '../pages/Register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },

      {
        index: true,
        element: (
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        ),
      },
      {
        path: 'add',
        element: (
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: 'edit/:id',
        element: (
          <PrivateRoute>
            <EditProduct />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
