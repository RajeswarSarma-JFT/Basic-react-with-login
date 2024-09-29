import React, { lazy, Suspense } from 'react';
const SigninPage = lazy(() => import('Pages/Auth/SigninPage'));
// const SignUp = lazy(() => import('Pages/Auth/SignupPage'));

const ForgotPassword = lazy(() => import('Pages/Auth/ForgotPassword'));
const ResetPassword = lazy(() => import('Pages/Auth/ResetPassword'));
// const EmailVerified = lazy(() => import('Components/Common/AuthSections/EmailVerified'));
// const CreatePassword = lazy(() => import('Pages/Auth/CreatePassword'));
const ChangePassword = lazy(() => import('Pages/Auth/ChangePassword'));
const PublicRoutes = [
  {
    path: '/',
    element: (
      <Suspense>
        <SigninPage />
      </Suspense>
    ),
  },
  {
    path: 'forgot-password',
    element: (
      <Suspense>
        <ForgotPassword />
      </Suspense>
    ),
  },
  {
    path: 'reset-password/:token',
    element: (
      <Suspense>
        <ResetPassword />
      </Suspense>
    ),
  },
  // {
  //   path: 'sign-up/:token',
  //   element: (
  //     <Suspense>
  //       <EmailVerified />
  //     </Suspense>
  //   ),
  // },
  // {
  //   path: 'create-password/:token',
  //   element: (
  //     <Suspense>
  //       <CreatePassword />
  //     </Suspense>
  //   ),
  // },
  // {
  //   path: 'account-signup',
  //   element: (
  //     <Suspense>
  //       <SignUp />
  //     </Suspense>
  //   ),
  // },
  {
    path: 'change-password',
    element: (
      <Suspense>
        <ChangePassword />
      </Suspense>
    ),
  },
];

export { PublicRoutes };
