from fastapi import APIRouter,HTTPException

from models.users import User_Login, User_Signup
from config.database import users_collections

router=APIRouter()

@router.post("/signup")
async def signup(user:User_Signup):
    existing = await users_collections.find_one({"useremail":user.useremail})
    if existing:
        raise HTTPException(status_code=400,detail="User Already exists")
    await users_collections.insert_one(user.dict())
    return{"msg":"New Account Created Successfully"}

@router.post("/login")
async def login(user:User_Login):
    existing = await users_collections.find_one({'useremail':user.useremail})
    if not existing:
        raise HTTPException(status_code=401,detail="User not registered")
    if user.userpassword!=existing["userpassword"]:
        raise HTTPException(status_code=401,detail="Password Incorrect")
    return{'msg':"Login Successful"}