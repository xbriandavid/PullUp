import cookie from "cookie"
export default (req,res) => {
    res.setHeader(
        "Set-Cookie",
        cookie.serialize("testCookie", "testCookieValue", {
            httpOnly: true,
            path: "/"
        })
    )
    res.statusCode = 200;
    res.json({success: true})
}