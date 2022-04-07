import "./card.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { MdDone, MdDelete } from 'react-icons/md';
import axios from "axios";
import "./StudyMain.css"
import { useNavigate } from "react-router-dom";

const DelBtn = styled.button`
  position: relative;
  right: -55%;
  bottom: 30%;
  margin-top: -5%;
  vertical-align: middle;
  border: none;
  background: none;
  font-size: 40px;
  color: #ff6b6b;
  &:hover {
    color: #F69F9F;
  }
`; 


export function Card({ card, handleDeleteRoome }) {

  
  const { id, roomname, recruit, member, score, roomId } = card;
  console.log(id);
  function useDel() {
    if(window.confirm('스터디룸을 삭제 하시겠습니까?')) {
        axios.delete(`http://localhost:3001/rooms/${card.id}`)
        handleDeleteRoome();
        
    }
  }
  

  // const [, setCardData] = useState("");

  // const handleUpdateRoom = (id) => {
  //   setCardData(prev=>prev.filter(card=>card.id === id));
  // }

  // console.log(card);
  function isRecruit(member){
    return (member > 39 ? "모집완료" : "모집중");
  }

  return (
    <>
      <div className="card_header"><Link className="StudyRoom" to={`/group/${roomId}`}>&nbsp;{roomname}</Link>
      <Link to='/group/RoomUpdate' className="button-design-update" state={{
          id: id,
          roomname: roomname,
          recruit: recruit,
          roomId: roomId,
          member: member,
          score: score,
        }}>수정</Link>
      </div>
      {/* <div className="recruit_num">{recruit}</div> */}
      <div className="recruit_num">{isRecruit(member)}</div>
      <div className="card_info">
        <div className="group_score">&nbsp;그룹 집중 점수: {score}</div>
        <div className="member_num">{member}/40</div>
        
      </div>
      <DelBtn onClick={useDel}><MdDelete /></DelBtn>
    </>
  );
}

export function Catbtn({ name, catActive, handleSetCat }) {
  return (
    <button
      className={`cat_btn hover ${catActive ? "active_btn" : null}`}
      onClick={() => handleSetCat(name)}
    >
      {name}
    </button>
  );
}

export function SearchBar({ onChange }) {
  return (
    <form className="search">
      <input
        type="text"
        placeholder="스터디룸을 검색해 보세요"
        className="search_bar"
        name="searchText"
        onChange={onChange}
      />
    </form>
  );
}

