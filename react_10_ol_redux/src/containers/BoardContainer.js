import { useSelector } from "react-redux";
import Board from "../components/Board";

export default function BoardContainer() {
  const mapState = useSelector((state)=>state.map.map);
  

  return <Board mapState={mapState}/>;
}