import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { Card, Catbtn, SearchBar } from "../../Presenter/StudyGroup/GroupFilter/Card";
import axiosHook from "../../Presenter/StudyGroup/axiosHook";
// import items from "./post.json";

import "../../Presenter/StudyGroup/GroupFilter/StudyMain.css";
import "../../Presenter/StudyGroup/GroupFilter/card.css";

import LogoSrc from "../../Presenter/StudyGroup/GroupFilter/book.jpg";
import useAxios from "../../Presenter/StudyGroup/axiosHook";
import axios from "axios";
import { useRecoilState } from "recoil";
import axiosManager from "../../../util/axiosManager";

const Logo = styled.img`
  width: 100%;
  max-height: 35vh;
  margin: 0px;
  opacity: 0.8;
  filter: brightness(120%);
  margin-bottom: 5vh;

  overflow: scroll;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
`;

export default function Display() {
  const [data, setData] = useState(null);
  const [filterdData, setFilterdData] = useState(null);
  const [activeCat, setActiveCat] = useState("전체");
  const [isLoaded, setIsLoaded] = useState(false);
  const [search, setSearch] = useState("");

  const handleDeleteRoome = (id) => {
    //TODO: ui상으로 삭제 & DB상 삭제
    console.log(id);
  };

  useEffect(() => {
    axiosManager.axios("/room", "GET").then((result) => {
      const initData = [];
      result.forEach((r) => {
        initData.push({
          id: r.id,
          roomname: r.room_name,
          recruit: r.is_recruit === 1 ? "모집중" : "모집완료",
          member: r.now_member,
          score: r.focus_point,
        });
      });
      setData(initData);
      setFilterdData(initData);
      setIsLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    if (activeCat === "전체") {
      setFilterdData([...data]);
    } else {
      setFilterdData([...data].filter((d) => d.recruit === activeCat));
    }
  }, [activeCat]);

  useEffect(() => {
    console.log(search);
    if (!isLoaded) return;
    setFilterdData([...data].filter((d) => d.roomname.includes(search)));
  }, [search]);

  return (
    <main>
      <Logo src={LogoSrc}></Logo>
      <SearchBar onChange={(e) => setSearch(e.target.value)} />
      <section>
        <article className="categories">
          <Catbtn name="전체" catActive={activeCat === "전체" ? true : false} handleSetCat={setActiveCat} />
          <Catbtn name="모집중" catActive={activeCat === "모집중" ? true : false} handleSetCat={setActiveCat} />
          <Catbtn name="모집완료" catActive={activeCat === "모집완료" ? true : false} handleSetCat={setActiveCat} />
        </article>
        <Link to="/group/RoomCreate" className="button-design">
          스터디룸 생성
        </Link>

        {/* <button onClick={updateData}>refresh</button> */}
        <article className="card_list">
          {filterdData &&
            filterdData.map((r, i) => (
              <div className="card_container" key={i}>
                <Card card={r} handleDeleteRoome={handleDeleteRoome}></Card>
              </div>
            ))}
          {/* {renderList.length > 0 ? (
            renderList
          ) : (
            <p>찾으시는 스터디룸이 존재하지 않습니다.</p>
          )} */}
        </article>
      </section>
      <footer></footer>
    </main>
  );
}
