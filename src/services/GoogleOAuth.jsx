import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import Button from "../components/common/Button";
import httpClient from "./httpClient";

const GoogleOAuth = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuth();
  const [loading, setLoading] = useState(false);

  const responseGoogle = async (tokenResponse) => {
    if (!tokenResponse?.code) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const googleAuthRes = await httpClient.post("/api/auth/google-login", {
        code: tokenResponse.code,
      });

      const { token, user } = googleAuthRes.data || {};

      if (token && user) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setToken(token);
        navigate("/");
      } else {
        console.error("Invalid response from server:", googleAuthRes.data);
      }
    } catch (error) {
      console.error("Error during Google login:", error);
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: (error) => {
      console.error("Google Login Failed:", error);
      setLoading(false);
    },
    flow: "auth-code",
  });

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={() => {
        setLoading(true);
        googleLogin();
      }}
      disabled={loading}
    >
      {loading ? "Connecting..." : "Continue with Google"}
    </Button>
  );
};

export default GoogleOAuth;
