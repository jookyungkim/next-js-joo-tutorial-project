import React, { useCallback } from "react";
import { END } from "redux-saga";
import axios from "axios";
import cookies from "next-cookies";

import wrapper from "../store/configureStore";
import { LOAD_MY_INFO_REQUEST, LOG_OUT_REQUEST } from "../reducers/user";
import AppLayout from "../components/AppLayout";
import LoginForm from "../components/LoginForm";
import { useSelector, useDispatch } from "react-redux";

const index = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  console.log("me ", me);
  const logout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, []);
  return (
    <>
      <AppLayout>
        <div>
          index
          <div>
            {me ? (
              <button type="button" onClick={logout}>
                logout
              </button>
            ) : (
              <LoginForm />
            )}
          </div>
        </div>
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, ...etc }) => {
      // **** 매우중요 ****
      // 쿠키를 프론트 서버에서 벡엔드 서버로 보내준다. 브라우저는 간섭을 못한다.
      // 실제 내 pc 쿠키가 있을때만 넣어주고 없을때는 "" 초기화 해주기

      const cookie = req ? req.headers.cookie : "";
      console.log("cookie!@#!@# : ", cookie);

      // console.log("cur 0 !@#!@# : ", cur[0]); Authorization
      // console.log("cur 1 !@#!@# : ", cur[1]); 토큰

      axios.defaults.headers.Cookie = "";
      if (req && cookie) {
        var cur = cookie.split("=");
        // axios.defaults.headers.Cookie = `Bearer ${cur[1]}`;
        axios.defaults.headers.Authorization = `Bearer ${cur[1]}`;
      }

      store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });

      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);
export default index;
