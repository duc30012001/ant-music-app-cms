## Set CORS for buckets

- Create json file:

  `echo '[{"origin":["https://ant-group-admin.vercel.app/","http://192.168.1.32:4500/", "http://192.168.1.24:3000/","https://fe.ant-group.net/","https://ant-group.net/"],"responseHeader":["*"],"method":["*"],"maxAgeSeconds":3600}]' > cors-config.json`

- Set CORS for buckets:

  `gsutil cors set cors-config.json gs://public-ant`

- View config CORS for buckets:

  `gsutil cors get gs://public-ant`

## ENV

    API_URL=https://be-app.antmusic.net
    WEBSITE_URL=https://ant-group.net
    EMAIL=contact@antmusic.net
    APP_NAME='ANT Relax | Together We Will Succeed'
    SLOGAN='Together We Will Succeed'
    APP_SHORT_NAME='ANT Relax'
    APP_IMAGE='/antgroup.png'
    APP_DESCRIPTION="Explore a world of possibilities with our diverse range of services at Home Website. From the symphonies of Ant Music to the language mastery of Ant Edu, the social landscapes of Ant Media, and the workforce transformation offered by Ant HRMS – we are your gateway to innovation, creativity, and excellence. Join us on a journey where every service is a testament to our commitment to empowering individuals and businesses alike. Discover more now!"
    APP_KEYWORDS='ant group, ant edu, ant music, ant media, ant hrms, ant vinh'
    ANT_GROUP_WEBSITE=https://ant-group.net
    SECRET_KEY = "ag-secret-key-2023-ashdshdsa"
    PRIMARY_COLOR=#1E79E4
    BACKGROUND_COLOR=#eef6fd
    # TEXT_COLOR=#434f66

    #UPLOAD
    BUCKET_NAME = public-ant
    PROJECT_ID = antmusic-381907
    CERT_PATH = "certs.json"
    FOLDER_FILE = "ant-relax"

    #NODEMAILER
    NODEMAILER_SENDER=thangpt@ant-media.net
    NODEMAILER_RECEIVER=contact@antmusic.net
    NODEMAILER_RECEIVER_CC=thangpt@ant-media.net
    NODEMAILER_PASS=vearuzelxiipudcg

## COMMAND BUILD DEV

     cd /www/wwwroot/ant-group-dev/ant-group && git pull origin dev && yarn && yarn build && pm2 restart ag-dev

## COMMAND BUILD MAIN

     cd /www/wwwroot/ag/ant-group && git pull origin main && yarn && yarn build && pm2 start --name=ag yarn -- start -p 4805 && pm2 save

## CONNECT TO INSTANCE

     gcloud compute ssh --project=antmusic-381907 --zone=asia-southeast1-b ant-group
