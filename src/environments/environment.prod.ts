export const environment = {
  production: true,
  firebaseConfig:{
    apiKey: 'AIzaSyCAWjiglmk1-l2H9XUUpt9eK30uK4OdkAQ',
    authDomain: 'rinconabuelos-6dbbf.firebaseapp.com',
    projectId: 'rinconabuelos-6dbbf',
    storageBucket: 'rinconabuelos-6dbbf.appspot.com',
    messagingSenderId: '46968422960',
    appId: '1:46968422960:web:19837aaf19208ab70aa3f5',
    measurementId: 'G-CNVQWGYF5E',
  },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ReExSpaces: new RegExp(/[a-zA-Z ]*[^\s]+/),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ReExMail: new RegExp(
    // tslint:disable-next-line: max-line-length
    // eslint-disable-next-line max-len
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ReExInteger: new RegExp(/^(0|[1-9]\d*)?/),
};
