from sqlalchemy.orm import Session
from models import TransactionCreate, TransactionDB

def get_all(db: Session):
    return db.query(TransactionDB).all()

def get_by_id(db: Session, tid: int):
    return db.query(TransactionDB).filter(TransactionDB.id == tid).first()

def add(db: Session, t: TransactionCreate):
    db_transaction = TransactionDB(**t.dict())
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

def update(db: Session, t: TransactionDB):
    db.merge(t)
    db.commit()
    return t

def delete(db: Session, tid: int):
    db_transaction = db.query(TransactionDB).filter(TransactionDB.id == tid).first()
    if db_transaction:
        db.delete(db_transaction)
        db.commit()
