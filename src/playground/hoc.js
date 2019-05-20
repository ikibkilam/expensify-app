// In chapter 101, we shall install a react-redux library, which allows us to connect our redux store to our react components,
// which makes use of higher order components (HOC), and in this video, we first study what is HOC.

// HOC - A react component that renders another component. For example, the HOC might render multiple other components (so for 
// example, 5 or 6 components might be rendered by a higher order component).

// First, we shall retiterate how we write a simple stateless functional react component.
// 0. We import react and react-dom.
// 1. We write the basic syntax of the component - We use an arrow function, we use a single parent tag <div></div>, we 
//    implicitly return JSX (ie. use brackets without a return) in the component as opposed to explicity returing JSX 
//    (ie. using a return), the parameter props is passed, and, the prop is used in the body within a JS expression, as follows 
//    below.
// 2. We write the render statement using ReactDOM.render. We pass the prop into the component here. I have shown this statement
//    in this comment section, since I later changed the render statement to render the HOC.
//    ReactDOM.render(<Info info = 'This is the Info stateless functional component' />, document.getElementById('app'));
// 3. This stateless functional react component is one of the multiple components that is rendered by a HOC. We still have not
//    developed a HOC.

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>This info is: {props.info}</p>
    </div>
);

// Next, we write a HOC. Let us assume we are working on a medical application, and we want to show some privileged information
// to the user, and we want the user to be aware when we do this. So, while we could add the text "Do not share this information",
// to every react component that makes up our application, but with HOC we do not do this and get some advantages - 1. reuse code, 
// 2. render hijacking, 3. prop manipulation, 4. abstract state.
// 0. Create a regular function, NOT a react component, withAdminWarning(). And this function is called with the regular component 
//    that we want to wrap (ie. Info). And we get something back, when we do this, and this is the HOC, AdminWarning. Note, we can 
//    have as many arguments as the number of regular react components we want to wrap, when we call the function (ie. 
//    withAdminWarning(X, Y, Z)). Of course, since we are calling the function with a single regular component here, we must have
//    a parameter in the function definition. Now, by convention, this is typically called, WrappedComponent. And within the body of
//    the function, we return the HOC, and this is why when we called withAdminWarning(Info), we got back a HOC.
// 1. The HOC we define here is a stateless functional component. And within the HOC, we implicity return some JSX, and we do pass
//    in props. The JSX can be whatever we want the component to render, and we can start with a set of <div> tags. Within these
//    tags, we have a few goals. First, we want to add the text warning, "Do not share this information". Second, we want to render
//    the WrappedComponent, because the goal is to display the message above the regula rcomponent we are wrapping.
// 2. So we first start with the warning text, using a set of <p> tags: <p>Do not show this information</p>.
// 3. Then, we want to render the regular component, and we do this by simply creating an instance of this component. 
// 4. Now, we have our very first HOC.
// 5. How do we use this HOC? We just render it, in the render statement, as below, by invoking AdminWarning, the HOC.
// 6. However, we note that our props are not being passed to the WrappedComponent. Here this is the Info component. To have the
//    props passed to the WrappedComponent, we can use the spread operator in a JS expression, when we create the instance of the
//    the WrappedComponent. Recall, when we passed props to a component, earlier when we were rendering components, we had passed 
//    each prop value in separately. The spread operator, essentially does this in a nice, concise way, and for all values of the
//    the props object.
// 7. I ran the code now, and everything works beautifully! 
// 8. Note, essentially, we created a regular function, called this function with the regular react component we want to render,
//    within this function we returned a stateless component that is our HOC, and within this HOC we preceeded the instantiation 
//    of the regular component with the text message that we want to run across all regular components that get passed to this 
//    regular function.
// 9. I deleted the simple <p>Do not share this information</p> statement, since I wanted to add some conditional logic to only
//    show this statement, if the person is an admin. And we do this by adding a prop in the render statement, isAdmin, and 
//    then using the && operator in the body of the HOC, within a JS expression, as below. This makes the HOC even more usable 
//    and versatile.

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            { props.isAdmin && <p>Do not share this information</p> }
            < WrappedComponent {...props}/ >
        </div>
    );
};

const AdminWarning = withAdminWarning(Info);

// ReactDOM.render(<AdminWarning isAdmin = {true} info = 'This is the Info stateless functional component' />, document.getElementById('app'));

// Exercise: Create a HOC, AuthInfo that either requires the user to authenticate or not.
// 0. Done like above. I did comment out the render statement above, so I could use the render statement below.
// 1. If user is authenticated, we want to show the Info component, else we do not and instead we want to show a message asking
//    user to login. 
// 2. Note, since we used the separator operator when we instantiated the WrappedComponent, all the props values are available in
//    the WrappedComponent, for use, although we used only the props.info.

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            { props.isAuthenticated ? <WrappedComponent {...props}/> : <p>Please log in</p> }
        </div>
    );
};

const AuthInfo = requireAuthentication(Info);

ReactDOM.render(<AuthInfo isAuthenticated = {false} isAdmin = {true} info = 'This is the Info stateless functional component' />, document.getElementById('app'));

