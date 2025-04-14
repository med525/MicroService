from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import TransactionCreate, Transaction, TransactionDB
import store
from database import SessionLocal, engine, Base

Base.metadata.create_all(bind=engine)

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/health")
def health():
    return "Transaction service is running"

@router.get("/retrieve-all", response_model=list[Transaction])
def get_all(db: Session = Depends(get_db)):
    return store.get_all(db)

@router.get("/retrieve/{tid}", response_model=Transaction)
def get_by_id(tid: int, db: Session = Depends(get_db)):
    t = store.get_by_id(db, tid)
    if not t:
        raise HTTPException(status_code=404, detail="Not found")
    return t

@router.post("/add", response_model=Transaction)
def add_transaction(t: TransactionCreate, db: Session = Depends(get_db)):
    return store.add(db, t)

@router.put("/update", response_model=Transaction)
def update_transaction(t: Transaction, db: Session = Depends(get_db)):
    return store.update(db, t)

@router.delete("/remove/{tid}")
def delete_transaction(tid: int, db: Session = Depends(get_db)):
    store.delete(db, tid)
    return {"message": "Deleted"}
