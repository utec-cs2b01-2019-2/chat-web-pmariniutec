from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import DeclarativeMeta
import json
import datetime


class Manager:
    Base = declarative_base()
    session = None

    def createEngine(self):
        engine = create_engine(
            'sqlite:///message.db?check_same_thread=False', echo=False)
        self.Base.metadata.create_all(engine)
        return engine

    def getSession(self, engine):
        if self.session is None:
            Session = sessionmaker(bind=engine)
            session = Session()

        return session


class AlchemyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj.__class__, DeclarativeMeta):
            from model.entities import User
            fields = {}
            for field in [x for x in dir(obj)
                          if not x.startswith('_') and x != 'metadata']:
                data = obj.__getattribute__(field)
                if isinstance(data, datetime.datetime):
                    fields[field] = data.strftime("%d/%m/%Y, %H:%M %p")
                elif isinstance(data, User):
                    fields[field] = data.email
                else:
                    try:
                        json.dumps(data)
                        fields[field] = data
                    except TypeError:
                        fields[field] = None

            return fields

        return json.JSONEncoder.default(self, obj)
