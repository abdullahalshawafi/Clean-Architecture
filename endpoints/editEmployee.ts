import {
    body,
    endpoint,
    Integer,
    pathParams,
    request,
    response,
    String,
} from "@airtasker/spot";

@endpoint({
    method: "PUT",
    path: "/api/employees/:employeeId",
})
class EditExistingEmployee {
    @request
    request(
        @pathParams
        pathParams: {
            employeeId: Integer;
        },

        @body body: EditEmployeeBody
    ) {}

    @response({ status: 200 })
    successfulResponse(@body body: String) {}

    @response({ status: 400 })
    badRequest(@body body: String) {}

    @response({ status: 404 })
    notFound(@body body: String) {}

    @response({ status: 500 })
    internalServerError(@body body: String) {}
}

interface EditEmployeeBody {
    name: String;
    salary: Integer;
}
