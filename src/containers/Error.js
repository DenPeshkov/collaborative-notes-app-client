import {Result} from "antd";
import {useLocation} from "react-router";

export default function Error() {
  const location = useLocation();

  return <Result
      status="error"
      title={location.state.status}
      subTitle={location.state.exception}
  />
}