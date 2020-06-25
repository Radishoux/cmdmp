import API, { graphqlOperation } from '@aws-amplify/api'
import PubSub from '@aws-amplify/pubsub';
import { createTodo } from './graphql/mutations'
import Analytics from '@aws-amplify/analytics';
import Auth from '@aws-amplify/auth';
import awsconfig from './aws-exports';

const amplifyConfig = {
    Auth: {
        identityPoolId: 'COGNITO_IDENTITY_POOL_ID',
        region: 'eu-central-1'
    }
}
//Initialize Amplify

const analyticsConfig = {
    AWSPinpoint: {
        // Amazon Pinpoint App Client ID
        appId: '3150c5ef365f455aa5761ad27f85a4ff',
        // Amazon service region
        region: 'eu-central-1',
        mandatorySignIn: false,
    }
}

//Initialize Analytics
Auth.configure(amplifyConfig);
API.configure(awsconfig);
PubSub.configure(awsconfig);
Analytics.configure(analyticsConfig)

async function createNewTodo() {
    const todo = { name: "Use AppSync" , description: "Realtime and Offline"}
    return await API.graphql(graphqlOperation(createTodo, { input: todo }))
}

const MutationButton = document.getElementById('btn1');
const MutationResult = document.getElementById('btn2');

MutationButton.addEventListener('click', (evt) => {
    console.log("u dumb")
    Analytics.record('some-event-name');
    
    Analytics.record({
        name: 'Album',
        attributes: { genre: 'Rock', year: '1989' }
    });
});
