import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { LOG_IN_REQUEST } from "../reducers/user";
import useInput from "../hooks/useInput";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { logInLoading, logInError } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput();
  const [password, onChangePassword] = useInput();

  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    dispatch({
      type: LOG_IN_REQUEST,
      data: { email, password },
    });
  });
  return (
    <>
      <form className="login-form" onSubmit={onSubmitForm}>
        <div className="id-gorup">
          <input
            name="user-email"
            type="email"
            value={email || ""}
            onChange={onChangeEmail}
            placeholder="1234@naver.com"
            required
          />
        </div>
        <div className="pwd-group">
          <input
            name="user-password"
            type="password"
            value={password || ""}
            onChange={onChangePassword}
            placeholder="password"
            required
          />
        </div>
        <button className="common-button" type="submit">
          로그인
        </button>
      </form>
    </>
  );
};

LoginForm.propTypes = {};

export default LoginForm;
