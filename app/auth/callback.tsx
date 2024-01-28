import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function AuthCallback() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = router.query.code as string;

    if (!code) {
      return;
    }

    const fetchToken = async () => {
      try {
        const response = await axios.post(
          "http://your-backend.com/api/authenticate",
          { code }
        );
        const { token, user } = response.data;

        // 토큰을 로컬 스토리지에 저장
        localStorage.setItem("token", token);

        // 사용자 정보를 상태로 저장하거나 context/redux로 관리

        // 인증이 완료되면 메인 페이지로 리디렉션
        router.push("/main");
      } catch (error) {
        console.error("Authentication failed:", error);
        setError("Login failed. Please try again.");
      }
    };

    fetchToken();
  }, [router]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <div>Authenticating...</div>;
}