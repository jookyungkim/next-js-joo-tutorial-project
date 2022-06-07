import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { REGISTER_USER_REQUEST } from "../reducers/user";

const register = (props) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [isPasswordChecked, setIsPassowrdChecked] = useState(false);
  const onSubmit = (data) => {
    console.log(data);
    const { email, password, passwordChecked, nickname } = data;

    if (password !== passwordChecked) return setIsPassowrdChecked(true);
    else setIsPassowrdChecked(false);

    dispatch({
      type: REGISTER_USER_REQUEST,
      data: { email, nickname, password },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>email</label>
          <input
            type="email"
            placeholder="1234@gmail.com"
            {...register("email", { required: true })}
          />
          <div style={{ color: "red" }}>
            {errors.email && <span>이메일을 입력하세요.</span>}
          </div>
        </div>
        <div>
          <label>password</label>
          <input
            type="password"
            {...register("password", { required: true })}
          />
          <div style={{ color: "red" }}>
            {errors.password && <span>비밀번호를 입력하세요.</span>}
          </div>
        </div>
        <div>
          <label>check password</label>
          <input
            type="password"
            {...register("passwordChecked", { required: true })}
          />
          <div style={{ color: "red" }}>
            {errors.passwordChecked && <span>비밀번호 다시 입력하세요.</span>}
            {isPasswordChecked && <span>비밀번호가 다릅니다.</span>}
          </div>
        </div>
        <div>
          <label>nickname</label>
          <input {...register("nickname")} />
        </div>

        <input type="submit" />
      </form>
    </>
  );
};

register.propTypes = {};

export default register;
