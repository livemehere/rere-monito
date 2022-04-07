import axios from "axios";

export function getEvent(postId) {
    return axios.get(
        { id: 1, title: '시험일', date: '2022-03-28', detail:"사회관 302호"},
    )
}