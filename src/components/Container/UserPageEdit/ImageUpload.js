import { Uploadimg } from "../../Presenter/UserPageEdit/ImageUpload";

const Uploader = () => {
  return (
    <>
      <Uploadimg>
        <input type="file" name="profile_img" accept="image/*" />
      </Uploadimg>
    </>
  );
};

export default Uploader;
