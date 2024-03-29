"use client";
import { ChangeEvent, useState } from "react";
import Input from "../components/Input";

import Title from "../components/Title";
import Blank from "../components/Blank";
import TextButton from "../components/Button/TextButton";
import Main from "../components/Main";
import Header from "../components/header/Header";
import {
  validateEmail,
  validateNickname,
  validatePassword,
} from "@/utils/validate";
import HeaderContainer from "../components/header/HeaderContainer";
import BackButton from "../components/Button/BackButton";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Register() {
  const [emailError, setEmailError] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(validateEmail(e.target.value));
  };

  const [passwordError, setPasswordError] = useState("");
  const [password, setPassword] = useState("");
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
    setPasswordError(validatePassword(e.target.value));
  };

  const [passwordCheckError, setPasswordCheckError] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const handlePasswordCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);
    setPasswordCheckError(validatePassword(e.target.value));
  };

  const [nicknameError, setNicknameError] = useState("");
  const [nickname, setNickname] = useState("");
  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setNicknameError(validateNickname(e.target.value));
  };

  const handleRegisterButton = async (
    event?: React.MouseEvent<HTMLButtonElement>
  ) => {
    event?.preventDefault();
    if (emailError) {
      alert("이메일이 올바르지 않습니다.");
      return;
    } else if (passwordError || passwordCheckError) {
      alert("비밀번호가 올바르지 않습니다.");
    } else if (nicknameError) {
      alert("닉네임이 올바르지 않습니다.");
    }

    if (
      email === "" ||
      password === "" ||
      passwordCheck === "" ||
      nickname === ""
    ) {
      alert("정보를 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_SERVER_URI + "/accounts/",
        {
          username: email,
          password: password,
          second_password: passwordCheck,
          nickname: nickname,
        }
      );

      if (response.status === 201) {
        const encodedNickname = encodeURIComponent(nickname);

        router.push(`/register/complete/${encodedNickname}`);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <HeaderContainer>
        <BackButton />
      </HeaderContainer>
      <Main>
        <div className="relative max-w-[370px] mx-auto">
          <Blank height="20px" />
          <div className="absolute left-0">
            <Title text="아이디(이메일)" />
          </div>
          <Blank height="40px" />
          <div className="flex items-center justify-center w-full">
            <div className="flex flex-col items-center space-y-1 w-full ">
              <form className="w-full">
                <div>
                  <Input
                    type="email"
                    placeholder="이메일을 입력해 주세요"
                    value={email}
                    onChange={handleEmailChange}
                    errorMessage={emailError}
                  />
                </div>
                <Blank height="40px" />
                <div className="absolute left-0">
                  <Title text="비밀번호" />
                </div>
                <Blank height="40px" />
                <div>
                  <Input
                    type="password"
                    placeholder="비밀번호을 입력해 주세요"
                    value={password}
                    onChange={handlePasswordChange}
                    errorMessage={passwordError}
                  />
                </div>
                <Blank height="20px" />
                <div>
                  <Input
                    type="password"
                    placeholder="비밀번호를 확인해 주세요"
                    value={passwordCheck}
                    onChange={handlePasswordCheckChange}
                    errorMessage={passwordCheckError}
                  />
                </div>
                <Blank height="40px" />
                <div className="absolute left-0">
                  <Title text="닉네임" />
                </div>
                <Blank height="40px" />
                <div>
                  <Input
                    type="text"
                    placeholder="닉네임를 입력해 주세요"
                    value={nickname}
                    onChange={handleNicknameChange}
                    errorMessage={nicknameError}
                  />
                </div>
                <Blank height="40px" />
                <div className="flex flex-col items-center w-full">
                  <div className="fixed bottom-1 left-0 right-0 px-[16px]">
                    <div className="max-w-[380px] mx-auto w-full">
                      {" "}
                      {/* 중앙 정렬을 위한 수정 */}
                      <TextButton
                        text="회원가입"
                        onClick={handleRegisterButton}
                      />
                    </div>
                  </div>
                </div>
              </form>
              <Blank height="10px" />
            </div>
          </div>
        </div>
      </Main>
    </>
  );
}
