
// ------------------------- CHAIN OF RESPONSABILITY -------------------------


class AbstractHandler {
    nextHandler = null;

    setNext(handler) {
        this.nextHandler = handler;
        return handler;
    }

    async handle(request) {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }
        return null
    }
}

class ValidateNameHandler extends AbstractHandler {
    async handle(request) {
        if(!request.name) throw Error('Name Needed');
        if(request.name.length > 30) throw Error('Name size exceeded - limit 30 characters');

        return super.handle(request);

    }
}

class ValidateEmailHandler extends AbstractHandler {
    async handle(request) {
        if(!request.email) throw Error('Email Needed');

        return super.handle(request);
    }
}

class ValidateImageHandler extends AbstractHandler {
    async handle(request)  {
        if(!request.imageFile) throw Error('Image Needed');

        return super.handle(request);

    }
}

export class ValidadeAndSubmitFormChain {
    start (data) {
        const name = new ValidateNameHandler();
        const email = new ValidateEmailHandler();
        const image = new ValidateImageHandler();

        name.setNext(email).setNext(image)

        return name.handle(data);
    }
}

