import { useParams } from "react-router-dom";

const Assignment = () => {
    const { id } = useParams();
    console.log(id);
  return (
    <div>Assignment</div>
  )
}

export default Assignment