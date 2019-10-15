from sqlalchemy import Column, Integer, String, Sequence, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import connector
from datetime import datetime


class User(connector.Manager.Base):
    __tablename__ = 'users'
    id = Column(Integer, Sequence('user_id_seq'), primary_key=True)
    email = Column(String(60), unique=True)
    fullname = Column(String(50))
    username = Column(String(12))
    password = Column(String(12))


class Message(connector.Manager.Base):
    __tablename__ = 'messages'
    id = Column(Integer, Sequence('message_id_seq'), primary_key=True)
    content = Column(String(500))
    sent_on = Column(DateTime, default=datetime.utcnow)
    user_from_id = Column(Integer, ForeignKey('users.id'))
    user_to_id = Column(Integer, ForeignKey('users.id'))
    user_from = relationship(User, foreign_keys=[user_from_id])
    user_to = relationship(User, foreign_keys=[user_to_id])


class Group(connector.Manager.Base):
    __tablename__ = "groups"
    id = Column(Integer, Sequence('groups_id_seq'), primary_key=True)
    name = Column(String(500))
