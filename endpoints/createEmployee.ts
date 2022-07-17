import {
    body,
    endpoint,
    Integer,
    request,
    response,
    String,
} from "@airtasker/spot";

@endpoint({
    method: "POST",
    path: "/api/employees/",
})
class CreateNewEmployee {
    @request
    request(@body body: CreateEmployeeBody) {}

    @response({ status: 201 })
    successfulResponse(@body body: String) {}

    @response({ status: 400 })
    badRequest(@body body: String) {}

    @response({ status: 500 })
    internalServerError(@body body: String) {}
}

interface CreateEmployeeBody {
    name: String;
    salary: Integer;
}
