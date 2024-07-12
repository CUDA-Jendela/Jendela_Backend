<br>
<div align="center">
    <div >
        <img height="150px" src="./img/logo.png" alt=""/>
    </div>
    <div>
            <h3><b>Jendela</b></h3>
            <p><i>Everybody deserves a second chance.</i></p>
    </div>      
</div>
<br>
<h1 align="center">Jendela Backend Website</h1>
The backbone of second chances: Jendela's backend system powers the platform with robust and secure infrastructure, managing data seamlessly, facilitating real-time interactions, and ensuring smooth integration with training partners and employers. It's the engine driving the empowerment of ex-convicts, providing them with the tools and support they need to build a brighter future.

## 👨🏻‍💻 &nbsp;Technology Stack

<div align="center">

<a href="https://expressjs.com/">
<kbd>
<img src="./img/logo/express.png" height="60" />
</kbd>
</a>

<a href="https://nodejs.org/en">
<kbd>
<img src="./img/logo/nodejs.png" height="60" />
</kbd>
</a>

<a href="https://firebase.google.com/">
<kbd>
<img src="https://firebasestorage.googleapis.com/v0/b/upheld-acumen-420202.appspot.com/o/readme-assets%2Ficons%2FFirebase.png?alt=media&token=da3b3135-dec1-4f6c-b0db-0051541754b6" height="60" />
</kbd>
</a>

<a href="https://gemini.google.com/">
<kbd>
<img src="https://firebasestorage.googleapis.com/v0/b/upheld-acumen-420202.appspot.com/o/readme-assets%2Ficons%2FGemini%20(1).png?alt=media&token=39c99afa-b82c-45f7-b59c-4df0ccecfe54" height="60" />
</kbd>
</a>

<a href="https://cloud.google.com/ai/generative-ai?utm_source=google&utm_medium=cpc&utm_campaign=japac-SG-all-en-dr-SKWS-all-all-trial-DSA-dr-1605216&utm_content=text-ad-none-none-DEV_c-CRE_655856181068-ADGP_Hybrid+%7C+SKWS+-+BRO+%7C+DSA+-All+Webpages-KWID_39700076131769766-aud-2079991351570:dsa-1456167871416&userloc_9120800-network_g&utm_term=KW_&gad_source=1&gclid=CjwKCAjwqMO0BhA8EiwAFTLgIBkG-yewCpP2k5I1dFtTBUayxyP2uA4Sr5RgVWL9a3IIjH50OuF-RhoCHkYQAvD_BwE&gclsrc=aw.ds">
<kbd>
<img src="./img/logo/genai.png" height="60" />
</kbd>
</a>

<a href="https://firebase.google.com/docs/firestore">
<kbd>
<img src="./img/logo/firestore.png" height="60" />
</kbd>
</a>

<a href="https://cloud.google.com/">
<kbd>
<img src="https://firebasestorage.googleapis.com/v0/b/upheld-acumen-420202.appspot.com/o/readme-assets%2Ficons%2FGCP.png?alt=media&token=a2af827f-269c-463c-b3d6-567e20822902" height="60" />
</kbd>
</a>

<a href="https://www.docker.com/">
<kbd>
<img src="https://firebasestorage.googleapis.com/v0/b/upheld-acumen-420202.appspot.com/o/readme-assets%2Ficons%2FDocker.png?alt=media&token=3588896c-975f-496f-87d0-e7e1bce0d492" height="60" />
</kbd>
</a>

</div>
<div align="center">
<h4>Express | NodeJS | Firebase | Gemini | Google GenAI | Firestore | Google Cloud | Docker</h4>
</div>

## ⚙️ &nbsp;How to Run
1. Clone this repository from terminal using this following command
    ``` bash
    $ git clone https://github.com/CUDA-Jendela/Jendela_Backend.git
    ```
2. Create a `.env` file inside the repository directory using `.env.example` file as the template. You should add information about your own Google project to the `.env` file 
3. Run the server using this following command, make sure you have Docker Desktop on your device.
    ``` bash
    $ docker compose up
    ```
4. Jendela backend server should be running. You can also check the server by opening http://localhost:8080
    
## 🔑 &nbsp;List of Endpoints

| Endpoint                             |  Method  |   Usage  |
| ------------------------------------ | :------: | -------- |
| /api/auth/register                   | POST     | Users can register and create account on Jendela
| /api/auth/login                      | POST     | Users can login to Jendela using their existing account
| /api/user/me                         | GET      | Users can get essential informations about themselves
| /api/business                        | POST     | Users as business partners can fill information/data about themselves
| /api/customer/1                      | POST     | Users as customers (ex-convicts) can fill the first part of information/data about themselves
| /api/customer/2                      | POST     | Users as customers (ex-convicts) can fill the second part of information/data about themselves
| /api/ngo                             | POST     | Users as NGOs can fill information/data about themselves
| /api/ngo/:id                         | GET      | Users can find information about a NGO
| /api/ngo/all                         | GET      | Users can find information about all NGOs
| /api/ngo/:id                         | PUT      | Users can update information about a NGO
| /api/ngo/:id                         | DELETE   | Users can delete information about a NGO
| /api/course                          | POST     | Users as NGOs can create new course
| /api/course/list                     | GET      | Users can see all courses available
| /api/course/:courseID                | GET      | Users can see a course detail
| /api/course/location                 | GET      | Users can find cities where all courses located
| /api/course-enrollment               | POST     | Users as customers (ex-convicts) can enroll themselves to a course
| /api/course-enrollment/:id           | GET      | Users can see a course enrollment detail
| /api/course-enrollment/all           | GET      | Users can see all course enrollments detail
| /api/course-enrollment/:id           | PUT      | Users can update information about a course-enrollment
| /api/course-enrollment/:id           | DELETE   | Users can delete information about a course-enrollment
| /api/skill                           | GET      | Users can find information about all skills
| /api/skill                           | POST     | Users can create new skill
| /api/skill                           | DELETE   | Users can delete existing skill
| /api/chat                            | GET      | Users can get their chat history with AI assistant
| /api/chat                            | POST     | Users can ask new question to AI assistant
| /api/recommendation/customer         | GET      | Users as customers (ex-convicts) can find courses recommended for them

## 👥 &nbsp;Contributors

| <a href="https://github.com/mikeleo03"><img width="180px" height="180px" src="https://firebasestorage.googleapis.com/v0/b/upheld-acumen-420202.appspot.com/o/readme-assets%2Fpicprof%2FLeon.png?alt=media&token=0ea1884a-32ca-471b-a3af-bf3995bbc605" alt=""/></a> | <a href="https://github.com/GoDillonAudris512"><img width="180px" height="180px" src="https://firebasestorage.googleapis.com/v0/b/upheld-acumen-420202.appspot.com/o/readme-assets%2Fpicprof%2FDillon.png?alt=media&token=bc76cc6b-5606-4351-8472-9c243c8b9da3" alt=""/></a> | <a href="https://github.com/arleenchr"><img width="180px" height="180px" src="./img/logo/arleen.jpg" alt=""/></a> | <a href="https://github.com/AustinPardosi"><img width="180px" height="180px" src="https://firebasestorage.googleapis.com/v0/b/upheld-acumen-420202.appspot.com/o/readme-assets%2Fpicprof%2FAustin.png?alt=media&token=f520a334-4aeb-4efe-9437-669451b6dca6" alt=""/></a> |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <div align="center"><h3><b><a href="https://github.com/mikeleo03">Michael Leon Putra Widhi</a></b></h3><i><p>Bandung Institute of Technology</i></p></div>                                                                               | <div align="center"><h3><b><a href="https://github.com/GoDillonAudris512">Go Dillon Audris</a></b></h3></a><p><i>Bandung Institute of Technology</i></p></div>                                                                          | <div align="center"><h3><b><a href="https://github.com/arleenchr">Arleen Chrysantha Gunardi</a></b></h3></a><p><i>Bandung Institute of Technology</i></p></div>                                                               | <div align="center"><h3><b><a href="https://github.com/AustinPardosi">Austin Gabriel Pardosi</a></b></h3></a><p><i>Bandung Institute of Technology</i></p></div>                                                                            |