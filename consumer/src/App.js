import React from 'react';

export default function App (){

  const Button = React.lazy(() => import('federated/Button'));

  return (
    <>
      <h1>App consumer</h1>
      <React.Suspense fallback="Loading Button">
        <Button />
      </React.Suspense>
    </>
  )
}