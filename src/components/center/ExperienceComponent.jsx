import { useEffect, useState } from "react";
import { Container, Row, ListGroup } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ExperienceModal from "./ExperienceModal";
import {
  getExperiencesAction,
  getMyProfileDetailsAction,
} from "../../redux/actions";
import { UPDATE_STATE_OF_EXPERIENCES } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import SingleExperience from "./SingleExperience";

const ExperienceComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // let userId = "";
  let userId = useSelector((state) => state.myProfile.detailsData._id);
  console.log("user id from exp comp", userId);
  let isNewExperienceAdded = useSelector(
    (state) => state.experiences.newExperienceAdded
  );

  let didWeDeleteAnExperience = useSelector(
    (state) => state.experiences.deletedExp
  );

  const experiencesArray = useSelector(
    (state) => state.experiences.experiences
  );

  useEffect(() => {
    dispatch(getMyProfileDetailsAction());
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(getExperiencesAction(userId));
    }
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(getExperiencesAction(userId));
    }
  }, [userId, didWeDeleteAnExperience]);

  useEffect(() => {
    if (userId && isNewExperienceAdded === true) {
      dispatch(getExperiencesAction(userId));
      dispatch({
        type: UPDATE_STATE_OF_EXPERIENCES,
        payload: false,
      });
    }
  }, [userId, isNewExperienceAdded]);

  const [plusButton, setPlusButton] = useState(false);

  const location = window.location.pathname;
  console.log("🚀 ~ ExperienceComponent ~ location", location);

  return (
    <>
      {location === "/editexperiences" ? (
        <Container className="profilePageCenterContainer px-0">
          <Row className="my-2">
            <div className="col experience-container-design p-4 normal-cursor-on-hover">
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <div className="editButtonIconDiv d-flex justify-content-center align-items-center">
                    <Link to={"/"}>
                      <Icon.ArrowLeft
                        style={{ fontSize: "25px" }}
                        className="text-dark"
                      />
                    </Link>
                  </div>
                  <h5 className="text-left ml-4 mb-0 normal-cursor-on-hover font-weight-bold">
                    Experience
                  </h5>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="d-flex flex-column justify-content-center align-items-center cursor-on-hover">
                    <div
                      className={
                        plusButton === true
                          ? "d-flex editButtonIconDiv justify-content-center align-items-center mr-2 add-icon rounded-circle plus-icon-button-experience-container"
                          : "d-flex editButtonIconDiv justify-content-center align-items-center mr-2 add-icon rounded-circle "
                      }
                      onClick={() => {
                        if (plusButton === false) {
                          setPlusButton(true);
                        } else {
                          setPlusButton(false);
                        }
                      }}
                    >
                      <Icon.Plus />
                    </div>
                    {/* <div className="d-flex justify-content-center align-items-center editButtonIconDiv mt-2 mr-2"> */}
                    {/* <Icon.Pencil style={{ fontSize: "20px" }} /> */}
                    {/* //!HERE GOES THE MODAL TO EDIT FIRST EXPERIENCE */}
                    {/* </div> */}
                    <div
                      className={
                        plusButton === true
                          ? "visible experience-dropdown light-grey-color p-3"
                          : "invisible experience-dropdown light-grey-color p-3"
                      }
                    >
                      <ExperienceModal />
                      <div className="d-flex">
                        <div className="mr-2">
                          <Icon.Calendar2Date />
                        </div>
                        <div>Add career break</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ml-5 ">
                <ListGroup variant="flush" className="px-0 text-left">
                  {experiencesArray.length !== 0
                    ? experiencesArray.map((experience) => {
                        return (
                          <SingleExperience
                            key={experience._id}
                            exp={experience}
                          />
                        );
                      })
                    : "No experience yet"}
                </ListGroup>
              </div>
            </div>
          </Row>
        </Container>
      ) : (
        <>
          <Row className="my-2">
            <div className="col experience-container-design p-4 normal-cursor-on-hover">
              <div className="d-flex justify-content-between">
                <h5 className="text-left mb-0 normal-cursor-on-hover font-weight-bold">
                  Experience
                </h5>
                <div className="d-flex text-center cursor-on-hover">
                  <div
                    className={
                      plusButton === true
                        ? "d-flex editButtonIconDiv justify-content-center align-items-center mr-2 add-icon rounded-circle plus-icon-button-experience-container"
                        : "d-flex editButtonIconDiv justify-content-center align-items-center mr-2 add-icon rounded-circle "
                    }
                    onClick={() => {
                      if (plusButton === false) {
                        setPlusButton(true);
                      } else {
                        setPlusButton(false);
                      }
                    }}
                  >
                    <Icon.Plus />
                  </div>
                  <div className="d-flex editButtonIconDiv justify-content-center align-items-center edit-icon">
                    <Link to={"/editexperiences"}>
                      <Icon.Pencil
                        className="text-dark pb-1"
                        style={{ fontSize: "23px" }}
                      />
                    </Link>
                  </div>
                  <div
                    className={
                      plusButton === true
                        ? "visible experience-dropdown light-grey-color p-3"
                        : "invisible experience-dropdown light-grey-color p-3"
                    }
                  >
                    {/* <div className="d-flex mb-1 add-position-experience-effect-on-hover">
                <div className="mr-2">
                  <Icon.BriefcaseFill />
                </div>
                <div>Add position</div>
              </div> */}
                    <ExperienceModal />
                    <div className="d-flex">
                      <div className="mr-2">
                        <Icon.Calendar2Date />
                      </div>
                      <div>Add career break</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" ">
                {experiencesArray.length !== 0 ? (
                  <ListGroup variant="flush" className="px-0 text-left">
                    <ListGroup.Item className="px-0">
                      <h6 className="font-weight-bold">
                        {experiencesArray[experiencesArray.length - 1].role}
                      </h6>
                      <div>
                        {experiencesArray[experiencesArray.length - 1].company}
                      </div>
                      <div className="light-grey-color">
                        {experiencesArray[experiencesArray.length - 1]
                          .endDate !== null
                          ? `${moment(
                              experiencesArray[experiencesArray.length - 1]
                                .startDate
                            ).format("MMMM YYYY")} - ${moment(
                              experiencesArray[experiencesArray.length - 1]
                                .endDate
                            ).format("MMMM YYYY")}`
                          : `${moment(
                              experiencesArray[experiencesArray.length - 1]
                                .startDate
                            ).format("MMMM YYYY")} - Present`}
                      </div>
                      <div className="light-grey-color">
                        {experiencesArray[experiencesArray.length - 1].area}
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="px-0 text-center pb-0">
                      <div className="d-flex align-items-center justify-content-center">
                        <div
                          className="cursor-on-hover"
                          onClick={() => {
                            navigate("/editexperiences");
                          }}
                        >
                          Show all {experiencesArray.length} experiences
                        </div>
                        <Icon.ArrowRight className="font-weight-bold ml-2 cursor-on-hover" />
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                ) : (
                  "nope"
                )}
              </div>
            </div>
          </Row>
        </>
      )}
    </>
  );
};

export default ExperienceComponent;
