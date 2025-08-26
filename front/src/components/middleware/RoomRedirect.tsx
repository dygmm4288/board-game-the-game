import { useEffect, useMemo, type PropsWithChildren } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useActiveRoom } from "../../queries/room";

const EXEMPT_PATHS = ["/room", "/login", "/sign"];

const isStartWithExemptPath = (pathname: string) =>
  EXEMPT_PATHS.some((exemptPath) => pathname.startsWith(exemptPath));

export default function RoomRedirect({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { roomId: routeRoomId } = useParams<{ roomId: string }>();
  const { isAuth } = useAuth();
  const { isLoading, data } = useActiveRoom(isAuth);

  const shouldRedirect = useMemo(
    () => !isStartWithExemptPath(pathname),
    [pathname],
  );

  useEffect(() => {
    if (isLoading || !isAuth) return;

    const roomId = data?.id ?? null;
    const navigateToMeRoom = () => navigate(`/room/${roomId}`);

    // 참여한 방이 있으면 해당 방으로 리다이렉트
    if (roomId && shouldRedirect) {
      navigateToMeRoom();
      return;
    }

    // 참여한 방이 있는데 엉뚱한 방이라면
    if (pathname.startsWith("/room") && roomId !== routeRoomId) {
      navigateToMeRoom();
      return;
    }
  }, [
    pathname,
    isAuth,
    isLoading,
    data,
    navigate,
    shouldRedirect,
    routeRoomId,
  ]);

  return <>{children}</>;
}
