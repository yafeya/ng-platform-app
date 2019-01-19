
/**
 * Delay give ms
 * @param elapse length of time
 */
export const Delay = function (elapse: number): Promise<any> {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve();
        }, elapse);
    });
}