<div align="center">
  <br />
  <img src="https://github.com/KodaHye/TIL/assets/72763127/71832a4e-4e35-4681-961f-5369290b1d84" width="80%"/>
  <br />
</div>

<div align="center">
 <h3><b>오늘도, 안녕</b></h3>
  2023.07.04 ~ 2022.08.18
  <br><br>

[Notion](https://intelligent-dracopelta-0c4.notion.site/8-976f884945bd4067b43a99830e8576bf?pvs=4) | [UCC](https://www.youtube.com/watch?v=NUvlaUJqsik)

</div>


<br>

# **프로젝트 개요**

### 팀원 소개

<table>
    <tr>
        <td height="140px" align="center"> <a href="https://github.com/minpaeng">
            <img src="https://avatars.githubusercontent.com/minpaeng" width="140px" /> <br><br> 👑 권민정 <br>(Back-End) </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/KodaHye">
            <img src="https://avatars.githubusercontent.com/KodaHye" width="140px" /> <br><br> 🐟 고다혜 <br>(Back-End) </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/Juahjoah">
            <img src="https://avatars.githubusercontent.com/Juahjoah" width="140px" /> <br><br> 🎀 김주아 <br>(Front-End) </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/sseq007">
            <img src="https://avatars.githubusercontent.com/sseq007" width="140px" /> <br><br> 🐲 신준호 <br>(Back-End) </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/yoon-dh">
            <img src="https://avatars.githubusercontent.com/yoon-dh" width="140px" /> <br><br> 🐰 윤동훈 <br>(Front-End) </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/izzy80">
            <img src="https://avatars.githubusercontent.com/izzy80" width="140px" /> <br><br> 🐯 이지현 <br>(Front-End) </a> <br></td>
    </tr>
</table>



### 서비스 배경
* 최근 20·30세대에서 우울증이 사회적 문제로 대두되고 있습니다. 우울증을 겪고 있는 청년은 많고, 약한 우울증으로 시작해 일상생활도 힘들어하는 청년들이 존재합니다. 젊은층의 우울증은 사회적 단절과 정서적 고립을 부르고 가족, 친구, 주변 사람들에게 자신의 마음 상태에 대해 적극적으로 도움을 요청하지 못합니다.

* 우울증에서 가장 중요한 것은 '자기관리' 입니다. 우울증의 극복을 위해 자신을 스스로 돌보는 노력이 필요하고, 사람과의 교류를 끊임없이 이어가도록 해야 됩니다.

* 우울증을 겪는 사람이 아니더라도, 본인의 습관에 대한 개선 의지를 가진 사람 또한 존재합니다. 생활 패턴을 바꾸고 싶다는 의지를 갖추고 있지만 '나와의 약속'을 지키는 것은 쉽지 않은 일입니다. 본인의 생활 습관을 개선하고 싶은 모든 사람을 대상으로 '나'에 대해 되돌아보고, 되돌아본 기록을 남길 수 있는 서비스를 기획하게 되었습니다.


### 서비스 이름 및 설명
* 다양한 사유로 규칙적인 생활을 원하는 사용자에게 효과적으로 생활 습관을 개선할 수 있도록 도움을 제공합니다.
* **생활 습관 개선**이라는 목표를 세운 사용자에게 용기와 응원을 줄 수 있는 서비스를 제공합니다. 


<br>

# 프로젝트 설계

### 아키텍처 구성도

<div align="center">
  <br />
  <img src="https://github.com/KodaHye/TIL/assets/72763127/0c508627-7592-44e4-8e85-0d6fc01acb98" width="80%"/>
  <br />
</div>



### ERD

<div align="center">
  <br />
  <img src="https://github.com/KodaHye/TIL/assets/72763127/7270b587-f271-4b7f-be22-6c857b48268e" width="80%"/>
  <br />
</div>





# 개발 환경 및 기술 스택

| FrontEnd                | BackEnd                         | CI/CD                     | 협업툴  |
| ----------------------- | ------------------------------- | ------------------------- | ------- |
| Node 18.16.1            | Java SE Development Kit 11.0.19 | AWS EC2(Ubuntu 20.04 LTS) | GitLab  |
| React 18.2.0            | Spring Boot 2.7.14              | Nginx 1.18.0              | Jira    |
| React-Router-Dom 6.14.2 | Gradle 8.1.1                    | Docker 24.0.5             | Notion  |
| Redux 4.2.1             | Apache Tomcat 9.0.78            | Redis 7.0.12              | figma   |
| Axios 1.4.0             | Json In Java 20160810           |                           | Swagger |
| Openvidu-Browser 2.28.0 | JJWT 0.9.1                      |                           | Postman |
|                         | Openvidu-Java-Client 2.28.0     |                           |         |


<br>

# 프로젝트 기능

### 1. 소셜 로그인

![소셜로그인](https://github.com/KodaHye/TIL/assets/72763127/bdcedd4f-8f30-41c7-9d62-b6562c7b62ad)

* 카카오, 네이버 로그인이 가능합니다.
* 최초 로그인 시에는 닉네임 설정을 진행합니다.



### 2. 개인 루틴 진행

![메인화면 - 루틴 선택](https://github.com/KodaHye/TIL/assets/72763127/b99a3e94-a003-496f-aeee-66788ee00a0e)

* 사용자는 일주일간 진행할 루틴을 선택합니다.
* 루틴은 한 번에 5개까지 선택 가능합니다.



![메인화면 - 루틴 인증](https://github.com/KodaHye/TIL/assets/72763127/58035c24-a9af-4a5e-a894-7ff93fc22a2d)

* 루틴 인증 시에는 날짜, 컨텐츠, 이미지를 입력합니다.
* 루틴 인증 내역은 마이페이지에서 조회 가능합니다.



### 3. 단체 루틴 진행

![단체루틴](https://github.com/KodaHye/TIL/assets/72763127/11b85f1e-ef9b-40e4-9293-ec010d6fe43c)

* 루틴을 혼자 진행하기에 어려움을 겪는 사람들을 위해 단체 루틴을 진행할 수 있는 서비스를 제공합니다.
* 단체 루틴은 서로 다른 루틴을 진행하고 있는 사람들이 모일 수 있는 화상 미팅 방입니다.
* 단체 루틴을 진행에 있어 어려움을 겪을 수 있기 때문에 진행을 도울 수 있는 안내 멘트를 출력하는 서비스를 제공합니다.



![팔로우 신청](https://github.com/KodaHye/TIL/assets/72763127/e7cddab8-2782-4c84-8b69-fcfb4047dd3e)

* 단체 루틴을 진행할 때에 같은 방에 있는 사람들끼리 팔로우를 신청할 수 있습니다. 팔로우, 팔로잉 내역은 마이페이지 내에서 확인할 수 있습니다.



### 4. 마이페이지

![마이 페이지](https://github.com/KodaHye/TIL/assets/72763127/d9a025fd-84c9-4f76-a492-ca2a43ee5c8a)

* 마이페이지에서는 **응원메시지, 버킷리트트, 갤러리, 목표 작성, 한줄일기 작성, 나의 루틴 조회, 버킷리스트** 기능을 제공합니다.
* 사용자는 8개의 위젯 중 사용하고 싶은 위젯만을 선택하여 사용할 수 있습니다.



### 5. 사용자 검색

![사용자 검색](https://github.com/KodaHye/TIL/assets/72763127/0e156460-e922-4910-918d-94c7a1cbe4a9)

* 사용자 검색은 닉네임을 통해 검색할 수 있습니다.
* 루틴 태그를 통한 검색도 제공합니다. 루틴 태그를 클릭하면, 해당 루틴을 진행하고 있는 사용자들이 검색 결과로 나오게 됩니다.



<br>

# 프로젝트 산출물

* [와이어프레임(Figma)](https://www.figma.com/file/ll4PC548rlp8tFiVOHGH6g/%5B8%ED%8C%80-%EA%B3%B5%ED%86%B5-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%5D-%EC%98%A4%EB%8A%98%EB%8F%84%2C-%EC%95%88%EB%85%95?type=design&node-id=129%3A4361&mode=design&t=e79LlqAf9hq9PZpa-1)
* [API 명세서](https://intelligent-dracopelta-0c4.notion.site/API-af078a3738e043e197564083610ab07a?pvs=4)
* [ERD](https://www.erdcloud.com/d/keMTuoeiKLFoiZ4aT)
* [회의록](https://intelligent-dracopelta-0c4.notion.site/c55c4c8a6578494fbcda10643ac5a7e6?pvs=4)
