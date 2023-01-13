export const checkLogIn = (req: any, res: any, next: any) => {  
  console.log(req.session);
  console.log("middlewares");
  console.log(req.user);
  
    
  if (!req.isAuthenticated()){
    return res.redirect("/api/login") 
  }
  next()
}