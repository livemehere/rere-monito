import { 
    MakeDdayBox,
    MakeDdayContent,
     Title,
     MainTitle,
     MakeDdayBtn,
     Form
} from "../../Presenter/UserDday/MakeDdayPresenter";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {ko} from "date-fns/esm/locale"

import { Input } from "antd"
import { Link } from "react-router-dom"; 

import { useState } from "react";

const {TextArea} = Input

const MakeDday = () => {
    

    const [date, setDate] = useState(new Date());
    const [title, setTitle] = useState("");
    const [goal, setGoal] = useState("");
    const now = new Date();

    const onChangeTitle = e => {
        setTitle(e.target.value);
    };
    const onChangeGoal = e => {
        setGoal(e.target.value);
    };

    const add = () => {
        alert("추가되었습니다");
    }
    



    return (
        <>
                <MakeDdayBox>
                    <MainTitle>D-DAY</MainTitle>

                    <Form className="Dday">
                        <Title>제목</Title>
                        <MakeDdayContent>
                            <input
                            value={title}
                            onChange={onChangeTitle}
                            />
                        </MakeDdayContent>

                        <Title>목표 날짜</Title>
                        <MakeDdayContent>
                            <DatePicker
                            locale={ko}  // 언어설정 한글
                            dateFormat="yyyy-MM-dd"  // 날짜 형식 설정
                            selected={date}  // value
                            onChange={(selectDate) => setDate(selectDate)} // 날짜 선택시 실행될 함수
                            value={date}
                            />
                        </MakeDdayContent>    

                        <Title>나의 각오</Title>
                        <MakeDdayContent>
                            <TextArea
                            autoSize={{ minRows: 6, maxRows:9}}
                            value={goal}
                            onChange={onChangeGoal}
                            />
                        </MakeDdayContent>
                    </Form>

                    <MakeDdayBtn type="submit">
                        <Link to="" className="MakeDdayBtn">추가</Link>
                    </MakeDdayBtn>

                    </MakeDdayBox>                
        </>
    );
};

export default MakeDday;