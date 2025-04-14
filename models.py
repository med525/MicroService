from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, Float
from database import Base

class TransactionCreate(BaseModel):
    description: str
    amount: float
    type: str

class Transaction(TransactionCreate):
    id: int

    class Config:
        orm_mode = True

class TransactionDB(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True, index=True)
    description = Column(String)
    amount = Column(Float)
    type = Column(String)
