import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { FORM_TYPE } from "../AuthPopup/AuthPopup";

export default function({ component: Component, ...props  }) {
  return (
    <Route>
      {() => {
        if (!props.loggedIn) props.onRedirect();
        return props.loggedIn ? <Component {...props} /> : <Redirect to={`/#${FORM_TYPE.SIGN_IN}`} />;
      }}
    </Route>
  );
}