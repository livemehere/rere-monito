import { atom, selector } from "recoil";


export const eventTextState = atom({  //calendar 적용 state
    key: "eventText",
    default:'',
})

export const calToggleState = atom({ key: "calToggle", default: false });

  
export const calArrayState = atom({
  key:'samplearray',
  default: [
    1,2,3,4,5,6,7,8,9,10
  ]
});
