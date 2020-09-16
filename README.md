# Node-Authentication

Authentication

#Cookies npm i cookie-parser
-> Store data in a user's browser
example:- name=Nikul, age=25,

res.setHeader('Set-Cookie','newUser=true')
req.cookies

console: to get cookie
document.cookie

// maxAge is a expires in time
// secure: true means only access via https
// httpOnly:true cant access data from javascript (frontend javascript)
res.cookie('isEmployee',true,{maxAge:1000 * 60 *60 \*24,secure:true})

# JWT

Headers :- Tells the server what type of signature is being used meta()
Payload :- Used to identify the user (e.g contain user id)
Signature :- Makes the token secure (like a stamp of authenticity)

headers.payload.signature
