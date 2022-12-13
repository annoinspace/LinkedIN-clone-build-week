import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import SideComponentsMyProfile from "../sidebar/SideComponentsMyProfile"
import LargeFooter from "./LargeFooter"
import ProfilePageCenter from "../center/ProfilePageCenter"
import { useDispatch } from "react-redux"
import { hideUserSearchAction } from "../../redux/actions"

export default function MyProfile() {
  const dispatch = useDispatch()
  return (
    <>
      <Container onClick={() => dispatch(hideUserSearchAction())}>
        <Row>
          <Col lg={9}>
            <ProfilePageCenter />
          </Col>
          <Col lg={3} className=" mt-3 p-0 ">
            {" "}
            <SideComponentsMyProfile />
          </Col>
        </Row>
      </Container>
      <LargeFooter />
    </>
  )
}
