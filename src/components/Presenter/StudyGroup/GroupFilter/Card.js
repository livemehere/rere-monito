import "./card.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { MdDone, MdDelete } from "react-icons/md";
import axios from "axios";
import "./StudyMain.css";


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
    color: #f69f9f;
  }
`;

export function Card({ card, handleDeleteRoome }) {
  const { id, roomname, recruit, member, score, roomCode } = card;

  return (
    <>
      <div className="card_header">
        <Link className="StudyRoom" 
        to={`/group/${roomCode}`}
        state={{
          id: id,
          roomname: roomname,
          recruit: recruit,
          roomCode: roomCode,
          member: member,
          score: score,
        }}>
          &nbsp;{roomname}
        </Link>
        <Link
          to="/group/RoomUpdate"
          className="button-design-update"
          state={{
            id: id,
            roomname: roomname,
            recruit: recruit,
            roomCode: roomCode,
            member: member,
            score: score,
          }}
        >
          수정
        </Link>
      </div>
      {/* <div className="recruit_num">{recruit}</div> */}
      <div className="recruit_num">{recruit}</div>
      <div className="card_info">
        <div className="group_score">&nbsp;그룹 집중 점수: {score}</div>
        <div className="member_num">{member}/40</div>
      </div>
      <DelBtn onClick={() => handleDeleteRoome(id)}>
        <MdDelete />
      </DelBtn>
    </>
  );
}

export function Catbtn({ name, catActive, handleSetCat }) {
  return (
    <button className={`cat_btn hover ${catActive ? "active_btn" : null}`} onClick={() => handleSetCat(name)}>
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
