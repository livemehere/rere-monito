import axios from "axios";

export function getEvent(postId) {
    return axios.get(
        { id: 1, title: '시험일', date: '2022-02-28', detail:"사회관 302호"},
        { id: 2, title: '캡스톤 회의', date: '2022-02-20',detail:"공학관 502호" }
    )
}